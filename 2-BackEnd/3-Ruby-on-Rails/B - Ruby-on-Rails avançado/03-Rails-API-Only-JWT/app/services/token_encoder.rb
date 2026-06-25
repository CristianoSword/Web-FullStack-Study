class TokenEncoder
  SECRET = "study-secret".freeze

  def encode(api_user)
    JWT.encode({ sub: api_user.id, email: api_user.email }, SECRET, "HS256")
  end
end
