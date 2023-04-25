import { useEffect, useState } from 'react';
import Account from '../components/Account';
import customersUtils from '../utils/customersUtils';
import { useAuth } from '../auth';

function AccountScreen(props) {
  const [account, setAccount] = useState({});
  const { authData } = useAuth();

  useEffect(() => {
    const fetchAccount = async id => {
      const data = await customersUtils.getCustomer(id);
      setAccount(data);
    };
    fetchAccount(authData.customer_id);
  }, []);

  return <Account accountType={'Customer'} account={account} />;
}

export default AccountScreen;
