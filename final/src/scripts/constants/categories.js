import { ReactComponent as Clothes } from '../../icons/shirt-solid.svg';
import { ReactComponent as Utensils } from '../../icons/utensils-solid.svg';
import { ReactComponent as Gas } from '../../icons/gas-pump-solid.svg';
import { ReactComponent as Gear } from '../../icons/gears-solid.svg';
import { ReactComponent as World } from '../../icons/earth-americas-solid.svg';
import { ReactComponent as Child } from '../../icons/child-reaching-solid.svg';
import { ReactComponent as Gift } from '../../icons/gift-solid.svg';
import { ReactComponent as Fort } from '../../icons/fort-awesome.svg';
import { ReactComponent as Shopping } from '../../icons/cart-shopping-solid.svg';
import { ReactComponent as Salary } from '../../icons/hand-holding-dollar-solid.svg';
import { ReactComponent as Sport } from '../../icons/person-snowboarding-solid.svg';
import { ReactComponent as Transportation } from '../../icons/train-subway-solid.svg';
import { ReactComponent as Transaction } from '../../icons/money-bill-transfer-solid.svg';

const categories = {
	clothes: <Clothes className="icon" />,
	restaurant: <Utensils className="icon" />,
	entertainment: <Fort className="icon" />,
	gas: <Gas className="icon" />,
	gift: <Gift className="icon" />,
	travel: <World className="icon" />,
	kids: <Child className="icon" />,
	shopping: <Shopping className="icon" />,
	sports: <Sport className="icon" />,
	transportation: <Transportation className="icon" />,
	transfer: <Transaction className="icon" />,
	salary: <Salary className="icon" />,
	default: <Gear className="icon" />,
};

export default categories;
