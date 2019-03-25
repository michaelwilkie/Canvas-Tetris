This is a work in progress.

As of 3/24/2019, you can drop/rotate pieces and clear lines, but not much else will happen.

I plan on:
    adding different colored blocks
    scores
    'next piece' preview screen
    better user-interface
    sound
    increasing difficulty

Difficulties:
    One thing I really had trouble with was JavaScript's garbage collection scheme.
    It is both a blessing and a curse.
    It's nice to forget about memory allocation/deallocation but once you have
    multiple arrays containing identical references, you make it difficult
    for the garbage collector to do its job.

    So I had to go through my classes and make sure clean up checked all
    associated arrays to make sure a deleted object was a deleted object.
    Otherwise, lines in the tetris game wouldn't be cleared and collision
    detection would be messed up.