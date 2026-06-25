class NotificationsController < ApplicationController
  def create
    notification = Notification.new(notification_params)
    return render json: { errors: notification.errors.full_messages }, status: :unprocessable_entity unless notification.save

    NotificationBroadcaster.new.broadcast(notification)
  end

  private

  def notification_params
    params.require(:notification).permit(:title, :body)
  end
end
