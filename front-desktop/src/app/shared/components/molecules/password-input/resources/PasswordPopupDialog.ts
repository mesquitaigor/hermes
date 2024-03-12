import { PasswordErrors } from '../../../../validators/password-validator/PasswordErrors';
import { RuleLevelPopup } from '../../password-level-popup/resources/RuleLevelPopup'
import { Rule } from '../../password-level-popup/resources/Rule';

export default class PasswordPopupDialog extends RuleLevelPopup{
  override firstLabel = 'Nível da sua senha';
  override rules = [
    new Rule({
      label: 'Possui letras maiusculas',
      condition: (): boolean =>
        this.pristineInputRuleCondition(
          PasswordErrors.shouldHaveUpperLetters
        ),
      levelText: 'Tá fraca ainda.',
    }),
    new Rule({
      label: 'Possui letras mínusculas',
      condition: (): boolean =>
        this.pristineInputRuleCondition(
          PasswordErrors.shouldHaveLowerLetters
        ),
      levelText: 'Começou a melhorar.',
    }),
    new Rule({
      label: 'Possui números',
      condition: (): boolean =>
        this.pristineInputRuleCondition(PasswordErrors.shouldHaveNumbers),
      levelText: 'Tá indo...',
    }),
    new Rule({
      label: 'Possui carácteres expeciais',
      condition: (): boolean =>
        this.pristineInputRuleCondition(
          PasswordErrors.shouldHavespecialCharacters
        ),
      levelText: 'Tá ficando boa em!',
    }),
    new Rule({
      label: 'Possui mais de 8 dígitos',
      condition: (): boolean => {
        return (
          this.pristineInputRuleCondition('minlength') &&
          this.pristineInputRuleCondition('required')
        );
      },
      levelText: 'Agora sim!',
    }),
  ]
}