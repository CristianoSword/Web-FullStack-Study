class NotificationsController < ApplicationController
  def create
    notification = Notification.create!(notification_params)
    NotificationBroadcaster.new.broadcast(notification)
  end

  private

  def notification_params
    params.require(:notification).permit(:title, :body)
  end
end
