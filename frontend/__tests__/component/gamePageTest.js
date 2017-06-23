import React from 'react';
import GamePage from '../../assets/js/pages/GamePage';
import { Card, Grid, Container, Button, Icon } from "semantic-ui-react";
import ReportBugForm from '../../assets/js/components/forms/ReportBugForm.js';
import InternalSlide from '../../assets/js/layout/InternalSlide';
import GameInformationCard from '../../assets/js/components/cards/GameInformationCard';
import DescriptionCard from '../../assets/js/components/cards/DescriptionCard';
import DevelopersCard from '../../assets/js/components/cards/DevelopersCard';
import PackageCard from '../../assets/js/components/cards/PackageCard';
import Comment from '../../assets/js/components/Comments';
import SegmentTitle from '../../assets/js/layout/SegmentTitle';
import renderer from 'react-test-renderer';

test('Test render GamePage', () => {
  const component = renderer.create(
      <Container>
          <SegmentTitle title="nome" />
          <Grid>
              <Grid.Row>
                  <Grid.Column width={10}>
                      <InternalSlide
                          media_image= 'image' 
                      />
                  </Grid.Column>

                  <Grid.Column width={6}>
                      <GameInformationCard
                          cover_image='image.jpg'
                          version="1.2"
                          official_repository="http://google.com"
                          launch_year="2016"
                          genres={['acao', 'aventura', 'terror']}
                          getFields={this.getFields}
                      />
                    <div style="style">
                       <ReportBugForm
                         button={
                           <Button animated="vertical" color="red">
                             <Button.Content hidden>Reportar bug</Button.Content>
                             <Button.Content visible>
                               <Icon name="shop" />
                             </Button.Content>
                           </Button>
                         }
                         game_pk={1}
                       />
                    </div>
                  </Grid.Column>
              </Grid.Row>

              <Grid.Row>
              </Grid.Row>

              <Grid.Row>
                  <Grid.Column width={10}>
                      <DescriptionCard
                          description="descricao"
                          awards={['acao', 'aventura', 'terror']}
                          getFields={this.getFields}
                      />
                  </Grid.Column>

                  <Grid.Column width={6}>
                      <PackageCard
                          packages={['package1', 'package2']}
                      />
                  </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                  <Grid.Column width={10}>
                      <Card fluid>
                          <Card.Content>
                              <Comment url={"unbgames.lappis.rocks/games/" + id} />
                          </Card.Content>
                      </Card>
                  </Grid.Column>
                  <Grid.Column width={6}>
                          <DevelopersCard
                              credits={['acao', 'aventura', 'terror']}
                              awards={['acao', 'aventura', 'terror']}
                          />
                  </Grid.Column>
              </Grid.Row>
          </Grid>
      </Container>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
