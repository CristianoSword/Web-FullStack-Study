class NotificationBroadcaster
  def broadcast(notification)
    NotificationsChannel.broadcast_to("feed", {
      id: notification.id,
      title: notification.title,
      body: notification.body
    })
  end
end
