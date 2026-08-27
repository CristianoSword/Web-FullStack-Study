class AssetValidationError(Exception):
    def __init__(self, asset_name: str) -> None:
        super().__init__(f"required asset is missing: {asset_name}")
        self.asset_name = asset_name
