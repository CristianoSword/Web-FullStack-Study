class PasswordMismatchError(Exception):
    def __init__(self) -> None:
        super().__init__("password and confirm_password must match")


class DisposableEmailError(Exception):
    def __init__(self, email: str) -> None:
        super().__init__(f"email domain is not allowed: {email}")
        self.email = email
