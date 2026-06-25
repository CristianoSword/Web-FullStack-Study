class SessionAuthenticator
  def initialize(scope = User.all)
    @scope = scope
  end

  def authenticate(email, password_digest)
    @scope.find_by(email: email, password_digest: password_digest)
  end
end
