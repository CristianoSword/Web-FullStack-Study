class DuplicateResourceError(Exception):
    def __init__(self, field_name: str, value: str) -> None:
        super().__init__(f"{field_name} already exists: {value}")
        self.field_name = field_name
        self.value = value


class ResourceNotFoundError(Exception):
    def __init__(self, resource_name: str, resource_id: int) -> None:
        super().__init__(f"{resource_name} was not found: {resource_id}")
        self.resource_name = resource_name
        self.resource_id = resource_id
