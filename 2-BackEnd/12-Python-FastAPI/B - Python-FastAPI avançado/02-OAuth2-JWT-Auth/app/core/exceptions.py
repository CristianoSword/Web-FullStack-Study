class AuthenticationError(Exception):
    def __init__(self, detail: str = "invalid username or password") -> None:
        super().__init__(detail)


class InactiveUserError(Exception):
    def __init__(self) -> None:
        super().__init__("inactive users cannot authenticate")


class DuplicateUserError(Exception):
    def __init__(self, field_name: str, value: str) -> None:
        super().__init__(f"{field_name} already exists: {value}")


class PasswordMismatchError(Exception):
    def __init__(self) -> None:
        super().__init__("password and confirm_password must match")
