import { cpf, cnpj} from "cpf-cnpj-validator";

const validateCpfCnpj = (value: string): boolean => {
  const regexCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

  if (regexCpf.test(value)) {
    return cpf.isValid(value);
  }

  if (regexCnpj.test(value)) {
    return cnpj.isValid(value);
  }

  return false
}

export default validateCpfCnpj;