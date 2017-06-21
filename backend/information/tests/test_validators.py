from information.validators import (
    min_max_validators,
    years_validator,
    MIN_IDX,
    MAX_IDX
)
from datetime import datetime
import pytest


class TimeMock(datetime):

    @classmethod
    def now(self):
        class Year:
            year = 2017
        return Year()


def test_years_validator(mock):
    dt = mock.patch('datetime.datetime')
    dt.now = TimeMock.now
    data = years_validator('MyModel')
    assert data['values'] == (1962, 2017)
    assert data['messages'][0] == 'Our University' \
        ' had not been built at this time!'
    assert data['messages'][1] == 'We believe the MyModel was not ' \
        'won in the future!'


@pytest.fixture
def validators():
    return min_max_validators((10, 20), ('teste min', 'teste max'))


def test_min_validator(validators):
    assert validators[MIN_IDX].limit_value == 10
    assert validators[MIN_IDX].message == 'teste min'


def test_max_validator(validators):
    assert validators[MAX_IDX].limit_value == 20
    assert validators[MAX_IDX].message == 'teste max'
