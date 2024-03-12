import { BehaviorSubject } from 'rxjs';
import { IRulesLevelPopup } from './IRulesLevelPopup';

export class Rule{
  state$ = new BehaviorSubject<{label: string, isOk: boolean}>(this.simpleStructure());
  private _label = ''
  private _levelText = ''
  private _applied = false
  constructor(props: IRulesLevelPopup.IRules){
    this._label = props.label;
    this._condition = props.condition;
    this._levelText = props.levelText;
    this._applied = props.ruleApplied || false;
    this.next();
  }
  
  getLabel(): string{
    return this._label;
  }
  
  getLevelText(): string{
    return this._levelText;
  }
  
  isApplied(): boolean{
    return this._applied;
  }
  
  
  next(): void{
    this.state$.next(this.simpleStructure());
  }

  updateStatus(): void{
    this._applied = this._condition();
    this.next();
  }

  private _condition = (): boolean => false
  
  private simpleStructure(): {label: string, isOk: boolean}{
    return {
      label: this._label,
      isOk: this._applied,
    }
  }
}