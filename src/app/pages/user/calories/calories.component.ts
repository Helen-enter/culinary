import {Component} from '@angular/core';
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.scss']
})
export class CaloriesComponent {
  weight: number
  height: number
  age: number

  isChecked = false

  selectLifeStyle: [
    'Сидячий образ жизни (офисная работа)',
    'Средняя активность (легкие упражнения 1-3 раза в неделю или активная работа, например, официант)',
    'Высокая активность (интенсивные занятия 3-5 раз в неделю)',
    'Очень высокая активность (тяжелые физические нагрузки 6-7 раз в неделю)'
  ]

  constructor(private userService: UserService) {
  }

  onChangeCheckbox($event: Event) {

  }


}
