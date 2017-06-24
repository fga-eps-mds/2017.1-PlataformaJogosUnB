import React from 'react';
import ReportBugForm from '../../assets/js/components/forms/ReportBugForm';
import {Button, Icon} from 'semantic-ui-react';
import {mount} from 'enzyme';
var expect = required('expect');

describe('Test render ReportBugFormTest', () => {

    it('test button props', () => {
        const component = mount(<ReportBugForm  button = {<Button animated="vertical" color="red">
                               <Button.Content hidden>Reportar bug</Button.Content>
                               <Button.Content visible>
                                 <Icon name="shop" />
                               </Button.Content>
                             </Button>}/>);
        expect(component.prop('button')).toEqual(
            <Button animated="vertical" color="red">
                               <Button.Content hidden>Reportar bug</Button.Content>
                               <Button.Content visible>
                                 <Icon name="shop" />
                               </Button.Content>
                             </Button>
        );
    });

});
