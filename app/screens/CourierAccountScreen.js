import { useEffect, useState } from 'react';
import Account from '../components/Account';
import accountUtils from '../utils/accountUtils';
import { useAuth } from '../auth';

function CourierAccountScreen() {
  const [account, setAccount] = useState({});
  const { authData } = useAuth();

  useEffect(() => {
    const fetchAccount = async (id, type) => {
      const data = await accountUtils.getAccount(id, type);
      setAccount(data);
    };
    fetchAccount(authData.courier_id, 'courier');
  }, []);

  const submitUpdate = async form => {
    return await accountUtils.updateAccount(
      authData.courier_id,
      'courier',
      form
    );
  };

  return (
    <Account
      accountType={'Courier'}
      account={account}
      submitUpdate={submitUpdate}
    />
  );
}

export default CourierAccountScreen;
