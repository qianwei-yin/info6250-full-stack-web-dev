# Objects, Arrays, Mutability, and the Spread operator

All programming languages treat variables and values a little differently.

One subtle aspect of Javascript that can cause confusion is the **mutation** of arrays and objects and the ways we deal with it

## What is Mutation?

Most variables in Javascript are **primitives**, and one aspect about primitive types is that they CANNOT CHANGE. Variables HOLDING primitive values nd change to point to different primitive values:

```
let cat = 'Jean';
cat = 'Jorts'; // 'cat' now references a different primitive value, but the actual string 'Jean' is unchanged, just no longer referenced
```

This can be disconcerting, because we mentally think of the value actually changing, but in terms of the computer memory, the variable value is changed to reference a different part of memory with the primitive value. 

The notable exception to all of this are the collections: arrays and objects.  These are collections of values and exist as a memory location themselves.  When we change a value IN an a collection, the collection retains the same identity.  It's like taking out or adding something to a box - the box is the same box, even if the contents have changed. This is why we can declare variables with object/array values as const and still change the contents of the object/array without violating the const declaration - the variables have not changed their value, they still reference the same object/array identity.  All that changed was that the object/array identity referenced now has different contents.

**Mutation** is what changing contents of a collection is called.  You can always change a variable to reference a different array, object, or other value (which is NOT permitted by const), but if the variable is still referencing the same array/object yet the contents of that array/object have changed, that is mutation.


```
const a = { test: 'here' }; 
const b = a; // variables a and b now both refer to the same object identity
console.log( b === a ); // true
a.test = 'there'; // mutation of that object identity
console.log( b === a ); // Still true!
console.log(b); // { test: 'there' }

let c = a; // a, b, and c now all refer to same object identity
c = { test: 'elsewhere' }; // Reassignment, not mutation
console.log( b === c ); // false
console.log(b); // test: 'there'
console.log(c); // test: 'elsewhere'
```

Coming from other languages, students might ask about whether Javascript is "pass by value" or "pass by reference". Those terms aren't very helpful here, because the answer is that Javascript passes the values, but when those values are a collection, they can be mutated, and when they are a primitive, they cannot.

```
const str = "String";
const obj = { test: 'here' };

function changeByAssignment( value ) { 
  value = 'test';
}

changeByAssignment(str);
console.log(str); // String, str was unchanged by passing it
changeByAssignment(obj);
console.log(obj); // { test: 'here' }, obj was unchanged by passing it

function changeByMutation( value ) { 
  value.test = 'there';
}

changeByMutation(obj);
console.log(obj); // { test: 'there' }, obj is unchanged, but object referenced has different contents
// As a note, calling changeByMutation(str):
// - causes no errors, as the string value is autowrapped into an object for the property assignment
// - does not change str, as the autowrapped object is NOT str itself (str.test will not be defined)
```

### Is Mutation bad?

This is a surprisingly complex question.  The practical answer is: "No".  The longer answer is, of course, "It depends".

There are certain approaches and paradigms (such as Functional Programming) where mutation should be avoided (and you get benefits for doing so!), and certain situations (such as state in React) where immutable values are important because comparisons are being made between the old and new values, but those don't apply to most programmers or most programming (at least not at this time).

This is not to say you SHOULDN'T consider a Functional Programming approach - that's a deeply nuanced and ongoing discussion in the industry, one that has been going on for decades - but avoiding mutation has a "cost" in terms of added complexity, and if you aren't getting the benefits of immutable collections in the code you are writing there is no reason to accept the costs of immutable collections.

## The Spread operator

The spread operator (`...`) is used before an object/array and, loosely speaking, is replaced with the values within the collection.  What this means is highly dependent on context, which is why the rest operator uses the same syntax (`...`) but has essentially the opposite meaning.  There is no collision because you can only use each operator in certain specific circumstances.

For arrays, the spread operator is commonly used for two different reasons:
- to copy the values within an array inside another array context
- to places the values within an array as distinct function parameters (as opposed to passing the array itself)

That second option is more limited and is well covered by the MDN page on the spread operator, so we will focus on the first: copying the values within an array to a different array context.

For objects, the spread operator is only used to copy key:value pairs within an object to another object context.  

A simple example for both is copying the collection.

```
const cats = ['Jorts', 'Jean', 'Nyancat'];
const actions = { morning: 'Eat', noon: 'Sleep', afternoon: 'Play', night: 'Zoomies' };

const catsCopy = [...cats]; // creating new array
const actionsCopy = { ...actions }; // creating new object

console.log( cats === catsCopy ); // false
console.log( catsCopy ); // same contents as cats

console.log( actions === actionsCopy ); // false
console.log( actionsCopy ); // same content as actions
```

When "copying" in this manner, other elements can be added to the newly created collections

```
const cats = ['Jorts', 'Jean', 'Nyancat'];
const actions = { morning: 'Eat', noon: 'Sleep', afternoon: 'Play', night: 'Zoomies' };

const catsCopy = ['Grumpy Cat', ...cats, 'Maru']; // the order is preserved
const actionsCopy = { 
    morning: 'Yowl', 
    earlyMorning: 'Yowl', 
    ...actions, 
    afternoon: 'Knock things off shelves', 
    lateNight: 'stare at wall',
 };

 console.log( catsCopy );
 console.log( actionsCopy ); // see below
```

Notice how the spread actions object interacted with the other properties. Properties declared before the spread were overridden by properties in the spread object (if they existed in the spread object) and properties after the spread object overrode properties that were in the spread object.  

The above declaration worked exactly the same way as if the properties and values were put in the object declaration directly, without the spread operator:

```
const actionsCopy = { 
    morning: 'Yowl',      // Overridden by later "morning" property
    earlyMorning: 'Yowl',
    morning: 'Eat', 
    noon: 'Sleep', 
    afternoon: 'Play',    // overriddden by later "afternoon" property 
    night: 'Zoomies'
    afternoon: 'Knock things off shelves',
    lateNight: 'stare at wall',
};
console.log( actionsCopy );
```

This feature of how objects handle repeated property names during declaration is used often in Javascript, allowing you to define default properties that can be overridden, and/or copying object properties that may exist but overriding certain properties whether or not they existed.

### Spread Operator and Mutation

The spread operator is often used to "copy" an array/object so that you can make changes without changing the original.

```
const cats = ['Jorts', 'Jean', 'Nyancat'];
const actions = { morning: 'Eat', noon: 'Sleep', afternoon: 'Play', night: 'Zoomies' };

const catsCopy = [...cats]; // creating new array copy
const actionsCopy = { ...actions }; // creating new object copy

catsCopy.push('Maru'); // mutation of copy
delete actionsCopy.morning; // mutation of copy

console.log(cats); // unaltered
console.log(actions); // unaltered
```

Often changes are made as the copy is being created.  This is the same result - an unmodified original, a copy based off the original, but with changes - just more compact.

```
const cats = ['Jorts', 'Jean', 'Nyancat'];
const actions = { morning: 'Eat', noon: 'Sleep', afternoon: 'Play', night: 'Zoomies' };

const catsCopy = [...cats, 'Maru']; // creating new array copy, with addition
const actionsCopy = { ...actions, twoAm: 'Jump on human' }; // creating new object, with addition
```
### Spread Operator is a "Shallow" copy

The "copy" created by the spread operator isn't created by the spread operator itself.  The spread operator is "spreading out" the contents in a context where the contents are expected. Those spread contents might be references to other arrays/objects, and those references aren't themselves spread out.  

```
const butteredVsNonButteredCats = [ ['Jorts'], ['Jean', 'Nyancat'] ];

const catsCopy = [ ...butteredVsNonButteredCats ]; // New array references original subarrays - shallow copy
butteredVsNonButteredCats[0].push('Grumpy'); // Add Grumpy Cat to buttered cats
console.log(catsCopy[0]); // Both Jorts and Grumpy in original!

// catsCopy[0] and butteredVsNonButteredCats[0] are same array
// even though catsCopy and butteredVsNonButteredCats are different arrays

const actions = { 
  humansAwake: { morning: 'Eat', noon: 'Sleep', afternoon: 'Play'},
  humansAsleep: { night: 'Zoomies', twoAm: 'Jump on human' },
};

const actionsCopy = { ...actions }; // New object key values reference original two sub objects - shallow copy
delete actionsCopy.humansAsleep.twoAm; 
console.log(actions); // humansAsleep no longer has a twoAm property

// actions.humansAsleep and actionsCopy.humansAsleep are same object
// even though actions and actionsCopy are different objects
```

There are a few solutions to this "problem", but generally you want to avoid infinite "deep" copying, as you can get into an infinite loop.

Most often, if you want to change a detail, you override it:

```
const actions = { 
  humansAwake: { morning: 'Eat', noon: 'Sleep', afternoon: 'Play'},
  humansAsleep: { night: 'Zoomies', twoAm: 'Jump on human' },
};

const actionsCopy = { 
  ...actions, 
  humansAsleep: { ...actions.humansAsleep, fiveAm: 'Yowl' },
}; // humansAsleep is itself a modified shallow copy
```

