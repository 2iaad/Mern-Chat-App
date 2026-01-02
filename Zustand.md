
- State = variables that can change over time
- Store = an object where state lives (variables + actions)
    Think of it as a box in memory that holds:
        ->Variables (state)
        ->Functions that modify that Variables (actions)
- Hook: gateway for components to access the store elements

The create we import from the zustand library is a function that return a react hook and takes an arrowed function as argument.

That arrowed function receives helpers like set & get and returns the initiale state of the store.

We use set to update states because its how react knows a change have been made -> trigger re-render.

# Difference between:
```
function Controls() {

    version 1: -> const increasePopulation = useBear((state) => state.increasePopulation)
    version 2: -> const { increasePopulation } = useBear()
    
  return <button onClick={increasePopulation}>one up</button>
}
```

- in version 1:
    1. You are selecting exactly one value from the store
    2. The component re-renders only if increasePopulation changes
    
- in version 2:
    1. Subscribes the component to the entire store
    2. The component re-renders on any store change