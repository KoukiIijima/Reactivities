import React, { useState, FormEvent } from 'react'
import { Form, Button, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/layout/models/activity'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'

interface IProps {
  setEditMdoe: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean
}

const ActivityForm: React.FC<IProps> = ({
  setEditMdoe,
  activity: initialFormState,
  createActivity,
  editActivity,
  submitting
}) => {

  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm)


  const handleSubmit = () => {
    console.log(activity);
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event.currentTarget);
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='title'
          placeholder="Title"
          value={activity.title} />
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder="Description"
          value={activity.description} />
        <Form.Input
          onChange={handleInputChange}
          name='category'
          placeholder="Category"
          value={activity.category} />
        <Form.Input
          onChange={handleInputChange}
          name='date'
          type="datetime-local"
          placeholder="Date"
          value={activity.date} />
        <Form.Input
          onChange={handleInputChange}
          name='city'
          placeholder="City"
          value={activity.city} />
        <Form.Input
          onChange={handleInputChange}
          name='venue'
          placeholder="Venue"
          value={activity.venue} />
        <Button
          loading={submitting}
          floated='right'
          type='submit'
          content='Submit' />
        <Button
          onClick={() => setEditMdoe(false)}
          floated='right'
          type='button'
          content='Cancel' />
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm);