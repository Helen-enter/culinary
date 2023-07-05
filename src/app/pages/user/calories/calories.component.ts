import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../../models/user";
import {UserRestService} from "../../../services/rest/user-rest.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.scss']
})
export class CaloriesComponent implements OnInit {
  weight: number
  height: number
  age: number

  man: string = 'man'
  woman: string = 'woman'
  gender: string = 'man' || 'woman'

  count: number

  categoryLife: string
  categoryObjective: string

  caloriesForm: FormGroup

  proteins: string
  fats: string
  carbohydrates: string

  isShowCaloriesForm: boolean = false
  isShowMyCalories: boolean = false

  dataUser: IUser


  selectLifeStyle = [
    'Сидячий образ жизни (офисная работа)',
    'Средняя активность (легкие упражнения 1-3 раза в неделю или активная работа, например, официант)',
    'Высокая активность (интенсивные занятия 3-5 раз в неделю)',
    'Очень высокая активность (тяжелые физические нагрузки 6-7 раз в неделю)'
  ]

  selectObjective = [
    'Хочу похудеть',
    'Хочу поддерживать вес',
    'Хочу набрать массу'
  ]

  // @ViewChild('myInput') myInput: any;
  // minValue = 0;

  categoryLifeCount: number
  categoryObjectiveCount: number

  normCalories: string

  isShow = false

  constructor(private userService: UserService,
              private userRestService: UserRestService,
              private messageService: MessageService) {
  }

  ngOnInit() {

    this.caloriesForm = new FormGroup({
      weight: new FormControl((''), {validators: Validators.required}),
      height: new FormControl((''), {validators: Validators.required}),
      age: new FormControl((''), [Validators.required, Validators.maxLength(2)]),
      categoryLife: new FormControl((''), {validators: Validators.required}),
      categoryObjective: new FormControl((''), {validators: Validators.required}),
      userId: new FormControl(this.userService.getUser().id)
    })
  }


  chooseGender(gender: string) {
    console.log('gender', gender)
    this.gender = gender
    return gender
  }

  countCalories() {
    const caloriesDataRow = this.caloriesForm.getRawValue()
    let formParams = new FormData()


    console.log('form params', caloriesDataRow)
    console.log('form params', caloriesDataRow.age)
    console.log('калории считаются')

    console.log('пол: ', this.gender)

    //базовый обмен
    //66.5 + (13.75 × вес в кг) + (5.003 × рост в см) - (6.775 × возраст в годах)  - для мужчин
    // 655.1 + (9.563 × вес в кг) + (1.85 × рост в см) - (4.676 × возраст в годах)  - для женщин


    if (this.gender === 'man') {
      this.count = 66.5 + (13.75 * caloriesDataRow.weight) + (5.003 * caloriesDataRow.height) - (6.775 * caloriesDataRow.age)
    } else if (this.gender === 'woman') {
      this.count = 655.1 + (9.563 * caloriesDataRow.weight) + (1.85 * caloriesDataRow.height) - (4.676 * caloriesDataRow.age)
    }


    if (caloriesDataRow.categoryLife === 'Сидячий образ жизни (офисная работа)') {
      this.categoryLifeCount = 1.2
    } else if (caloriesDataRow.categoryLife === 'Средняя активность (легкие упражнения 1-3 раза в неделю или активная работа, например, официант)') {
      this.categoryLifeCount = 1.375
    } else if (caloriesDataRow.categoryLife === 'Высокая активность (интенсивные занятия 3-5 раз в неделю)') {
      this.categoryLifeCount = 1.55
    } else if (caloriesDataRow.categoryLife === 'Очень высокая активность (тяжелые физические нагрузки 6-7 раз в неделю)') {
      this.categoryLifeCount = 1.725
    }


    const normCalories = this.count * this.categoryLifeCount
    if (caloriesDataRow.categoryObjective === 'Не хочу ничего менять') {
      //обмен с учетом ораза жизни
      const myNormCalories = normCalories.toFixed(0)
      this.normCalories = myNormCalories


      const proteins1 = (caloriesDataRow.weight * 1.5).toFixed(0)
      const proteins2 = caloriesDataRow.weight * 2
      this.proteins = `${proteins1}-${proteins2}`

      const fats1 = caloriesDataRow.weight
      const fats2 = (caloriesDataRow.weight * 1.5).toFixed(0)
      this.fats = `${fats1}-${fats2}`

      const carbohydrates1 = this.countCarbohydrates(normCalories, Number(proteins1), fats1)
      const carbohydrates2 = this.countCarbohydrates(normCalories, Number(proteins2), Number(fats1))

      this.carbohydrates = `${carbohydrates2}-${carbohydrates1}`

    } else if (caloriesDataRow.categoryObjective === 'Хочу похудеть') {
      //дефицит
      const deficit = (normCalories * 0.8).toFixed(0)
      this.normCalories = deficit

      const proteins1 = (0.25 * (Number(deficit) / 4.1)).toFixed(0)
      const proteins2 = (0.30 * (Number(deficit) / 4.1)).toFixed(0)
      this.proteins = `${proteins1}-${proteins2}`

      const fats1 = caloriesDataRow.weight
      const fats2 = (caloriesDataRow.weight * 1.5).toFixed(0)
      this.fats = `${fats1}-${fats2}`

      const carbohydrates1 = this.countCarbohydrates(Number(deficit), Number(proteins1), fats1)
      const carbohydrates2 = this.countCarbohydrates(Number(deficit), Number(proteins2), Number(fats1))

      this.carbohydrates = `${carbohydrates2}-${carbohydrates1}`

    } else if (caloriesDataRow.categoryObjective === 'Хочу набрать массу') {
      //профицит
      const proficit = (normCalories + 100).toFixed(0)
      this.normCalories = proficit


      const proteins1 = (2 * caloriesDataRow.weight).toFixed(0)
      const proteins2 = (2.5 * caloriesDataRow.weight).toFixed(0)
      this.proteins = `${proteins1}-${proteins2}`

      const fats1 = caloriesDataRow.weight
      const fats2 = (caloriesDataRow.weight * 1.5).toFixed(0)
      this.fats = `${fats1}-${fats2}`

      const carbohydrates1 = this.countCarbohydrates(Number(proficit), Number(proteins1), fats1)
      const carbohydrates2 = this.countCarbohydrates(Number(proficit), Number(proteins2), Number(fats1))

      this.carbohydrates = `${carbohydrates2}-${carbohydrates1}`

    }


    // console.log('цель', this.normCalories)
    // console.log('бо', count)

    this.isShow = true
  }

  countCarbohydrates(normCalories: number, proteins: number, fats: number) {
    const carbohydrates = ((normCalories - (proteins * 4.1) - (fats * 9.3)) / 4.1).toFixed(0)
    return carbohydrates
  }

  showCaloriesForm() {
    this.isShowCaloriesForm = !this.isShowCaloriesForm
    this.isShowMyCalories = false
  }

  showMyCalories() {
    this.isShowMyCalories = !this.isShowMyCalories
    this.isShowCaloriesForm = false


    const userId = this.userService.getUser().id

    this.userRestService.getUserById(userId).subscribe((data) => {
      this.dataUser = data
      console.log('dataUser', this.dataUser)
    })


  }

  saveCalories(normCalories: string, proteins: string, fats: string, carbohydrates: string) {
    const userId = this.userService.getUser().id

    const userObj: IUser = {
      login: this.userService.getUser().login,
      psw: this.userService.getUser().psw,
      email: this.userService.getUser().email,
      id: userId,

      calories: normCalories,
      proteins: proteins,
      fats: fats,
      carbohydrates: carbohydrates
    }

    console.log('your user: ', userObj)
    this.userRestService.updateUser(userId, userObj).subscribe((data) => {
    })
    this.messageService.add({severity: 'success', summary: 'Вы сохранили результат!'})

  }

}
