import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { ERRORS, ERROR_MESSAGES } from '../constants/errorConstants';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default function validateTransaction(trans) {
	const { id, amount, type, category, time, accountType, account } = trans;
	const result = {
		ok: false,
		msg: '',
	};

	// id exists and id isn't valid
	if (id !== '' && !uuidValidateV4(id)) {
		result.msg = ERROR_MESSAGES[ERRORS.INVALID_TRANSACTION_ID];
		return result;
	}
	if (Number(amount) <= 0) {
		result.msg = ERROR_MESSAGES[ERRORS.INVALID_TRANSACTION_AMOUNT];
		return result;
	}
	if (Number(amount) > 100000000) {
		result.msg = ERROR_MESSAGES[ERRORS.TOO_LONG_TRANSACTION_AMOUNT];
		return result;
	}
	if (!type) {
		result.msg = ERROR_MESSAGES[ERRORS.INVALID_TRANSACTION_TYPE];
		return result;
	}
	if (!category) {
		result.msg = ERROR_MESSAGES[ERRORS.INVALID_TRANSACTION_CATEGORY];
		return result;
	}
	if (!validateTime(time)) {
		result.msg = ERROR_MESSAGES[ERRORS.INVALID_TRANSACTION_TIME];
		return result;
	}
	if (!accountType) {
		result.msg = ERROR_MESSAGES[ERRORS.INVALID_TRANSACTION_ACCOUNT_TYPE];
		return result;
	}
	if (!account) {
		result.msg = ERROR_MESSAGES[ERRORS.INVALID_TRANSACTION_ACCOUNT];
		return result;
	}

	result.ok = true;
	return result;
}

function uuidValidateV4(uuid) {
	return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

function validateTime(time) {
	return dayjs(time, 'YYYY-MM-DD[T]HH:mm', true).isValid();
}
