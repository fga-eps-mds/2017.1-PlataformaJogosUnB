from django.test import TestCase
from information.serializers import InformationSerializer
from information.models import Award, Developer, Genre, Information
from information.serializers import GenreSerializer
from information.serializers import DeveloperSerializer
from information.serializers import AwardSerializer

class GenreSerializerTestCase(TestCase):

    def test_serialization_genre(self):
      genre = Genre(
                name='Corrida',
                description='Jogos de carros velozes')
      genre.save()
      
      genre_serialized = GenreSerializer(genre).data
      expected_json_genre = { 
                'name': 'Corrida', 
                'description': 'Jogos de carros velozes' }
      
      self.assertEqual(genre_serialized, expected_json_genre)


class AwardSerializerTestCase(TestCase):

    def test_serialization_award(self):
      award = Award(name='VGA', year='2017', place='UnB')
      award.save()

      award_serialized = AwardSerializer(award).data
      expected_json_award = {
                 "name": 'VGA',
                 "year": 2017,
                 "place": 'UnB'}
      self.assertEqual(award_serialized, expected_json_award)


class DeveloperSerializerTestCase(TestCase):
     
    def test_serialization_developer(self):
      developer = Developer(
                name='Developer',
                avatar='none',
                login='developer',
                email='developer@gmail.com',
                github_page='http://github.com/developer')
      developer.save()
      
      developer_serialized = DeveloperSerializer(developer).data
      expected_json_developer = { 
                'name': 'Developer',
                'avatar': '/public/none',
                'login': 'developer',
                'email': 'developer@gmail.com',
                'github_page': 'http://github.com/developer'}
      print(developer_serialized)
      print(expected_json_developer) 
      self.assertEqual(developer_serialized, expected_json_developer)
      
 
