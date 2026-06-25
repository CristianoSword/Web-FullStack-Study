class TokenDecoder
  SECRET = TokenEncoder::SECRET

  def decode(token)
    JWT.decode(token, SECRET, true, algorithm: "HS256").first
  end
end
