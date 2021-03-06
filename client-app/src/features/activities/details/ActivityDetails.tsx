import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/layout/models/activity'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'

interface IProps {
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({ setEditMode,setSelectedActivity }) => {
    const activityStore = useContext(ActivityStore);
    const {selectedActivity: activity} = activityStore;
    return (
        <Card>
            <Image src={`/assets/categoryImages/${activity?.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity?.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity?.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity?.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button 
                    onClick={() => setEditMode(true)} 
                    basic color="blue" 
                    content="Edit" />
                    <Button
                    basic 
                    color="grey" 
                    content="Cancel"
                    onClick={() => setSelectedActivity(null)} />
                </Button.Group>
            </Card.Content>
        </Card >
    )
}

export default observer(ActivityDetails);