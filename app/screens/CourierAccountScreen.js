import { useEffect, useState } from 'react';
import Account from '../components/Account';
import couriersUtils from '../utils/couriersUtils';
import { useAuth } from '../auth';

function CourierAccountScreen(props) {
  const [account, setAccount] = useState({});
  const { authData } = useAuth();

  useEffect(() => {
    const fetchAccount = async id => {
      const data = await couriersUtils.getCourier(id);
      setAccount(data);
    };
    fetchAccount(authData.courier_id);
  }, []);

  return <Account accountType={'Courier'} account={account} />;
}

export default CourierAccountScreen;
