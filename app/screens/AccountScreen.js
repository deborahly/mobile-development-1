import { useEffect, useState } from 'react';
import Account from '../components/Account';
import accountUtils from '../utils/accountUtils';
import { useAuth } from '../auth';

function AccountScreen() {
  const { authData } = useAuth();
  const [account, setAccount] = useState({});

  useEffect(() => {
    const fetchAccount = async (id, type) => {
      const data = await accountUtils.getAccount(id, type);
      setAccount(data);
    };
    fetchAccount(authData.customer_id, 'customer');
  }, []);

  const submitUpdate = async form => {
    const data = await accountUtils.updateAccount(
      authData.customer_id,
      'customer',
      form
    );
  };

  return (
    <Account
      accountType={'Customer'}
      account={account}
      submitUpdate={submitUpdate}
    />
  );
}

export default AccountScreen;
