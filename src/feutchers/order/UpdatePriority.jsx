import { Form } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

function UpdatePriority() {
  return (
    <Form method="PATCH">
      <button type="primary" className="button">
        ارسال سریع تر (20%+){' '}
      </button>
    </Form>
  );
}
export async function actionPatchPriority({ request, params }) {
  const data = { priority: true };
  console.log(params.orderID, data);
  await updateOrder(params.orderID, data);
  return null;
}

export default UpdatePriority;
