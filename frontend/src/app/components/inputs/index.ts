import { Input } from 'antd';

import { formInput } from 'app/components/inputs/common/form-input';

const InputField = formInput(Input);
const PasswordInputField = formInput(Input.Password);

export {
    InputField,
    PasswordInputField,
};
