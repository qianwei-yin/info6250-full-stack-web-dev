import { GiClothes, GiForkKnifeSpoon, GiGasPump, GiPriceTag, GiWorld } from 'react-icons/gi';
import { FaChild, FaGift, FaFortAwesome, FaShoppingCart, FaMoneyCheckAlt } from 'react-icons/fa';
import { MdSportsMartialArts, MdEmojiTransportation } from 'react-icons/md';
import { AiOutlineTransaction } from 'react-icons/ai';

const categories = {
	clothes: <GiClothes />,
	restaurant: <GiForkKnifeSpoon />,
	entertainment: <FaFortAwesome />,
	gas: <GiGasPump />,
	gift: <FaGift />,
	travel: <GiWorld />,
	kids: <FaChild />,
	shopping: <FaShoppingCart />,
	sports: <MdSportsMartialArts />,
	transportation: <MdEmojiTransportation />,
	transfer: <AiOutlineTransaction />,
	salary: <FaMoneyCheckAlt />,
	default: <GiPriceTag />,
};

export default categories;
