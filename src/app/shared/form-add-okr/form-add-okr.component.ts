import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-okr',
  templateUrl: './form-add-okr.component.html',
  styleUrls: ['./form-add-okr.component.scss'],
})
export class FormAddOkrComponent  implements OnInit {
  okrForm: FormGroup;

  @Input() hashOkrUp: string = '';

  constructor(private fb: FormBuilder) {
    this.okrForm = this.fb.group({
      title: ['', Validators.required],
      timeframe: ['', Validators.required],
      results: this.fb.array([])
    });
    
    this.addResult(); // Adiciona um campo de resultado inicialmente
  }

  ngOnInit(): void {
      setTimeout(() => {
        console.log("this.hash ", this.hashOkrUp)
      }, 3000);
  }

  get results() {
    return this.okrForm.get('results') as FormArray;
  }

  addResult() {
    const resultForm = this.fb.group({
      name: ['', Validators.required],
      percent: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.results.push(resultForm);
  }

  removeResult(index: number) {
    this.results.removeAt(index);
  }

  onSubmit() {
    if (this.okrForm.valid) {
      console.log(this.okrForm.value);
      // Lógica de envio do formulário
    } else {
      console.log('Formulário inválido');
    }
  }

}
