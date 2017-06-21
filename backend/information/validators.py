import datetime
from django.utils.translation import ugettext_lazy as _
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
)


MIN_IDX = 0
MAX_IDX = 1
UNB_CREATION = 1962


def min_max_validators(values, messages):
    return [MinValueValidator(values[MIN_IDX],
                              _(messages[MIN_IDX])),
            MaxValueValidator(values[MAX_IDX],
                              _(messages[MAX_IDX]))]


def years_validator(model_name):
    return {
        'values': (UNB_CREATION, int(datetime.datetime.now().year)),
        'messages': (
            _('Our University had not been built at this time!'),
            _('We believe the {} '.format(model_name) +
              'was not won in the future!')
        )
    }
