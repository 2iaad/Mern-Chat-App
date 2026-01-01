# why ts over js ?
    explainning using small example:

```
/** @param {any[]} arr */
    function compact(arr) {
        if (arr.length > 10)
            return arr.trim(0, 10) -> Property 'trim' does not exist on type 'any[]'.
    }
```
    in this case the arr might be an Array that does not have the .trim method. so typing it out in the prototype will let use know the type of the array (map, vetor.. etc) before having the app crashed