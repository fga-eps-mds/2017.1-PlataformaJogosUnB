from information.models import Information, Award, Developer, Genre
from rest_framework import serializers


class AwardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Award
        fields = ['name', 'year', 'place']


class DeveloperSerializer(serializers.ModelSerializer):

    class Meta:
        model = Developer
        fields = ['name', 'avatar', 'login', 'email', 'github_page']


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ['name', 'description']


class InformationSerializer(serializers.ModelSerializer):

    developers = DeveloperSerializer(many=True, required=False)
    awards = AwardSerializer(many=True, required=False)
    genres = GenreSerializer(many=True, required=False)
    game_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Information
        fields = ['description',
                  'launch_year',
                  'semester',
                  'developers',
                  'awards',
                  'genres',
                  'game_id',
                  ]

    def create(self, validated_data):
        '''
        Overrode to be able to support nested classes.
        '''
        information = self.create_nested_relationships(
            [Developer, Award, Genre],
            ['developers', 'awards', 'genres'],
        )

        return information

    def create_nested_relationships(self, nested_classes, attrs):
        ''' Create nested relashionships.

        Keyword arguments:
        nested_classes -- list of internal classes: [ClassA, ClassB]
        attrs          -- list with names of attributes that establish
                          the relationships: [classesA, classesB]

        Returns model object with established attributes
        '''
        objects = []
        for attrname in attrs:
            objects.append(self.validated_data.pop(attrname, []))

        model = self.Meta.model.objects.create(**self.validated_data)

        for i in range(len(objects)):
            for one_object in objects[i]:
                new_object = nested_classes[i].objects.get_or_create(
                    **one_object
                )

                getattr(model, attrs[i]).add(new_object[0])

        return model
