import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-single-candidate',
  standalone: true,
  imports: [],
  templateUrl: './single-candidate.component.html',
  styleUrl: './single-candidate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent {

}
