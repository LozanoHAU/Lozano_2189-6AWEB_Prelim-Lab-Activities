import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.css',
})
export class DataBinding {
message="Data Binding Demonstration!";
title="The Bull-Stallion Convention (BS)";
description="This is my new Application for registering new birthed foals/calves!";
imageURL="https://static.vecteezy.com/system/resources/previews/020/901/807/non_2x/cute-bull-cartoon-style-vector.jpg";
w=250;
h=250;
altText="Cartoon Bull"
textColor="blue";
ishighlight = true;
bgImage = true;
yourName="";

studentName = "Aaron Lozano";
score=95;
imageUrl="https://www.zarebasystems.com/media/wysiwyg/zs/cms/learning-center/zs-lc-electric-fencing-for-bulls.jpg";
isDisabled=true;
colSpanValue=3;
isPassing=true;
boxColor="purple";
boxSize="150px";
count = 0;

increment() {
  this.count++;
}

decrement() {
  this.count--;
}

}
