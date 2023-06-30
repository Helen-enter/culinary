import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.scss']
})
export class CaloriesComponent implements OnInit, AfterViewInit {
  weight: number
  height: number
  age: number

  categoryLife: string
  categoryObjective: string

  caloriesForm: FormGroup

  proteins: string
  fats: number | string
  carbohydrates: string | number | bigint | any


  selectLifeStyle = [
    'Сидячий образ жизни (офисная работа)',
    'Средняя активность (легкие упражнения 1-3 раза в неделю или активная работа, например, официант)',
    'Высокая активность (интенсивные занятия 3-5 раз в неделю)',
    'Очень высокая активность (тяжелые физические нагрузки 6-7 раз в неделю)'
  ]

  selectObjective = [
    'Хочу похудеть',
    'Не хочу ничего менять',
    'Хочу набрать массу'
  ]

  // @ViewChild('myInput') myInput: any;
  // minValue = 0;

  categoryLifeCount: number
  categoryObjectiveCount: number

  normCalories: string

  isShow = false

  constructor(private userService: UserService) {
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

  ngAfterViewInit() {
    // this.myInput.nativeElement.min = this.minValue;
  }

  countCalories() {
    const caloriesDataRow = this.caloriesForm.getRawValue()
    let formParams = new FormData()


    console.log('form params', caloriesDataRow)
    console.log('form params', caloriesDataRow.age)
    console.log('калории считаются')


    //базовый обмен
    const count = 655.1 + (9.563 * caloriesDataRow.weight) + (1.85 * caloriesDataRow.height) - (4.676 * caloriesDataRow.age)

    if (caloriesDataRow.categoryLife === 'Сидячий образ жизни (офисная работа)') {
      this.categoryLifeCount = 1.2
    } else if (caloriesDataRow.categoryLife === 'Средняя активность (легкие упражнения 1-3 раза в неделю или активная работа, например, официант)') {
      this.categoryLifeCount = 1.375
    } else if (caloriesDataRow.categoryLife === 'Высокая активность (интенсивные занятия 3-5 раз в неделю)') {
      this.categoryLifeCount = 1.55
    } else if (caloriesDataRow.categoryLife === 'Очень высокая активность (тяжелые физические нагрузки 6-7 раз в неделю)') {
      this.categoryLifeCount = 1.725
    }


    const normCalories = count * this.categoryLifeCount
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


    console.log('цель', this.normCalories)
    console.log('бо', count)

    this.isShow = true
  }

  countCarbohydrates(normCalories: number, proteins: number, fats: number) {
    const carbohydrates = ((normCalories - (proteins * 4.1) - (fats * 9.3)) / 4.1).toFixed(0)
    return carbohydrates
  }

  // onInputChanged() {
  //   if (this.myInput.nativeElement.value < this.minValue) {
  //     this.myInput.nativeElement.value = this.minValue;
  //   }
  // }


}
