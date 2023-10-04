import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMemberComponent } from './post-member.component';

describe('PostMemberComponent', () => {
  let component: PostMemberComponent;
  let fixture: ComponentFixture<PostMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostMemberComponent]
    });
    fixture = TestBed.createComponent(PostMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
