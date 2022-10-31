import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {
  MdBadgeWatchedController,
  MD_BADGE_WATCHED_CONTROLLER,
  MD_BADGE_WATCHED_PROVIDER,
} from '../badge.controller';

type PrimitiveTypes = string | number;

@Component({
  selector: 'md-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  providers: [MD_BADGE_WATCHED_PROVIDER],
})
export class MdBadgeComponent implements OnInit, OnChanges {
  @Input() color?: MdnBadgeColor;

  @Output() public remove: EventEmitter<Event>;

  constructor(
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef,
    @Inject(MD_BADGE_WATCHED_CONTROLLER)
    private readonly controller: MdBadgeWatchedController
  ) {
    this.remove = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @HostBinding('class.md-badge-large')
  private get large(): boolean {
    return this.controller.isLarge;
  }

  @HostBinding('class.md-badge-small')
  private get small(): boolean {
    return this.controller.isSmall;
  }

  public get clearable(): boolean {
    return this.controller.clearable;
  }

  public onRemove(): void {
    this.removed.emit(this.item);
  }
}
