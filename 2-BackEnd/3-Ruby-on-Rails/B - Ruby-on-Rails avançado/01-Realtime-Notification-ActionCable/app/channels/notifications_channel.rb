class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for "feed"
  end
end
