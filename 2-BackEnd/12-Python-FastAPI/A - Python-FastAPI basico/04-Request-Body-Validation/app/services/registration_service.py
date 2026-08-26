from hashlib import sha1

from app.core.exceptions import DisposableEmailError, PasswordMismatchError
from app.models.registration import RegistrationRequest, RegistrationResponse


class RegistrationService:
    blocked_domains = {"mailinator.com", "tempmail.com", "10minutemail.com"}

    def register(self, payload: RegistrationRequest) -> RegistrationResponse:
        if payload.password != payload.confirm_password:
            raise PasswordMismatchError()

        domain = payload.email.split("@", 1)[1].lower()
        if domain in self.blocked_domains:
            raise DisposableEmailError(payload.email)

        customer_id = self._build_customer_id(payload)
        masked_phone = self._mask_phone(payload.phone)

        return RegistrationResponse(
            customer_id=customer_id,
            full_name=payload.full_name,
            email=payload.email,
            masked_phone=masked_phone,
            city=payload.address.city,
            newsletter_opt_in=payload.newsletter_opt_in,
        )

    def _build_customer_id(self, payload: RegistrationRequest) -> str:
        digest = sha1(f"{payload.email}:{payload.phone}".encode("utf-8")).hexdigest()
        return f"CUST-{digest[:8].upper()}"

    def _mask_phone(self, phone: str) -> str:
        suffix = phone[-4:]
        return f"***-***-{suffix}"
