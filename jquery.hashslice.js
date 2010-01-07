/*----------------------------------------------------------------------------
 * jQuery HashSlice
 * ---------------------------------------------------------------------------
 * jQuery:  1.2.x compatible
 * Keyword: hashslice, hash slice, hash to array
 *
 * Author:  Stephen Blum
 * Twitter: stephenlb
 *
 * GitHub:  git://github.com/stephenlb/jquery-hashslice.git
 *
 * Files:   jquery.hashslice.js      ## Source
 *          jquery.hashslice.min.js  ## Minified hashslice JS lib
 *          jquery.hashslice.test.js ## Tests and Example Usage
 *          minify.pl                ## Perl JS Minifier 
 *                                   ## ./minify.pl code.js > min.js
 *
 * Summary: The great and first Hash slice JavaScript implementation. A hash
 *          is also an Object, the two are interchangeable. This hashslice
 *          method allows quick syntax for grabbing an array of hash elements.
 *          Also, as in Perl, hashslice can be used to join new elements
 *          between two hashes. Perl provides a much preferred interface to
 *          hash slicing.
 * 
 * ---------------------------------------------------------------------------
 * USAGE TYPE 1: Single string with whitespace delimiters. **** FAVORITE ****
 * ---------------------------------------------------------------------------
 * var list = $.hashslice( hash, 'apples berries pies' );
 *
 * ---------------------------------------------------------------------------
 * USAGE TYPE 2: Single string with multiple delimiters.
 * ---------------------------------------------------------------------------
 * var list = $.hashslice( hash, 'apples, berries, pies' );
 * var list = $.hashslice( hash, 'apples | berries | pies' );
 *
 * ---------------------------------------------------------------------------
 * USAGE TYPE 3: Array argument.
 * ---------------------------------------------------------------------------
 * var list = $.hashslice( hash, ['apples', 'berries', 'pies'] );
 *
 * ---------------------------------------------------------------------------
 * USAGE TYPE 4: Hash Augmentation / Update.
 * ---------------------------------------------------------------------------
 * $.hashslice( hash, 'sans salts', { sans : 'fluffy', salts : 'white' } );
 *
 * ---------------------------------------------------------------------------
 * EXAMPLE 1: Using favorite method shown in Usage Type 1.
 * ---------------------------------------------------------------------------
 * var hash = {
 *         candy   : 'okay',
 *         apples  : 2,
 *         berries : 'yes',
 *         pies    : 'flavor',
 *         sand    : { bead : [5, 2] }
 *     };
 *
 * var list = $.hashslice( hash, 'apples berries pies' );
 *
 * ---------------------------------------------------------------------------
 * EXAMPLE 2: Hashslicing inward to add new elements or update old ones.
 * ---------------------------------------------------------------------------
 * var hash = {
 *         candy   : 'okay',
 *         apples  : 2,
 *     },
 *     update = {
 *         candy : 'merged',
 *         canes : 'yes'
 *     };
 *
 * //           hash <------<------< update (leftward merge)
 * $.hashslice( hash, 'candy canes', update );
 *
 * hash.candy == 'merged'; // true
 * hash.canes == 'yes';    // true
 *
 *----------------------------------------------------------------------------
 */
(function(){

var trim = /^\W+|\W+$/g
,   nowd = /\W+/
,   str  = 'string'; 

jQuery.hashslice = function( hash, elements, update ) {
    var list = jQuery.extend( true, [], update || hash ), // deep copy
        elms = typeof elements === str ?                  // is str list?
               elements.
               replace(trim, '').                         // trim
               split(nowd) :                              // arrayify
               elements;                                  // else default

    jQuery.each( elms, function(elm) {                    // itterate
        var e = elms[elm];
        if (update) hash[e] = list[e] || list[elm];       // slice in
        else        list.push(list[e]);                   // slice out
    } );

    return update ? hash : list;                          // return in or out
};

})();
