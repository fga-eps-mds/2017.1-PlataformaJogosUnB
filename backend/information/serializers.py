from rest_framework import serializers
from information.models import (
    Information, Award, Credit, Genre
)


class AwardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Award
        fields = ['name', 'place']


class CreditSerializer(serializers.ModelSerializer):

    class Meta:
        model = Credit
        fields = ['specialty', 'name', 'email', 'github_page', 'personal_page',
                  'behance_page', 'soundCloud_page']


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ['name', 'description']


class InformationSerializer(serializers.ModelSerializer):

    awards = AwardSerializer(many=True, required=False)
    genres = GenreSerializer(many=True, required=False)
    game_id = serializers.IntegerField(write_only=True)

    likes = serializers.ReadOnlyField()
    dislikes = serializers.ReadOnlyField()

    class Meta:
        model = Information
        fields = [
            'description',
            'launch_year',
            'semester',
            'credits',
            'awards',
            'genres',
            'game_id',
            'likes',
            'dislikes']

    credits = CreditSerializer(many=True, required=False)

    def create(self, validated_data):
        '''
        Overrode to be able to support nested classes.
        '''
        information = self.create_nested_relationships(
            [Credit, Award, Genre],
            ['credits', 'awards', 'genres'],
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
