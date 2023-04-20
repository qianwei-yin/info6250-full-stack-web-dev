import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
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
		result.msg = 'The id is invalid, please refresh the page and try again.';
		return result;
	}

	if (amount <= 0) {
		result.msg = 'The amount should be larger than 0.';
		return result;
	}

	if (!type) {
		result.msg = "The type hasn't been chosen.";
		return result;
	}

	if (!category) {
		result.msg = "The category hasn't been chosen.";
		return result;
	}

	if (!validateTime(time)) {
		result.msg = 'The time you chosen is invalid.';
		return result;
	}

	if (!accountType) {
		result.msg = "The account type hasn't been chosen.";
		return result;
	}

	if (!account) {
		result.msg = "The account hasn't been chosen.";
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

uuidValidateV4('c57aadc4-9af1-4bb2-acf1-abeeb1556231');
