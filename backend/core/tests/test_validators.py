from core.validators import get_valid_extensions_text


def test_not_allowed_extensions():
    assert get_valid_extensions_text([]) == "There are no valid extensions"
