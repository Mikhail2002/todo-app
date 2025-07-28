import { Component, Input } from '@angular/core';
import { Priority } from '../../core/models/todo.model';

@Component({
  selector: 'app-priority-label',
  templateUrl: './priority-label.component.html',
  styleUrl: './priority-label.component.scss'
})
export class PriorityLabelComponent {
  @Input() priority: Priority = 'medium';
}
