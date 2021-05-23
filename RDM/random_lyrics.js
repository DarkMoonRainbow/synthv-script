var SCRIPT_TITLE = "Random Lyrics";

function getClientInfo() {
    return {
        "name": SV.T(SCRIPT_TITLE),
        "author": "R.D.M.",
        "versionNumber": 2,
        "minEditorVersion": 65537
    }
}

var _rand = 0x7C38FA53;

var chr = [
    [
        "a","i","u","e","o",
        "sa","shi","su","se","so",
        "na","ni","ne",
        "ha","fu",
        "ma","mi","me",
        "yu","yo",
        "ra","ri","ru","re","ro",
        "sha","shi","she",
        "fa","fi","fe",
        "ti",
        "vi","ve","vo",
        "di","du"
    ],
    [
        ".aa",".iy",".uw",".eh",".ow",
        ".s aa",".s ih",".s uw",".s ey",".s ow",
        ".t iy",".t ey",
        ".n aa",".n iy",".n eh",
        ".hh aa",".f uw",
        ".m aa",".m iy",".m eh",
        ".y eh",
        ".r aa",".r iy",".r uw",".r ey",".r ow",
        ".sh aa",".sh iy",".sh eh",
        ".f aa",".f iy",".f eh",
        ".v iy",".v eh",".v ow",
        ".d iy",".d uw",
        ".s t aa",".s t iy",
        ".th iy",".th ey"
    ],
    [
        ".a",".i",".u",".e",".@U",
        ".s A",".s` i",".s u",".s e",".s @U",
        ".th i",".th e",
        ".n A",".n i",".n u",".n e",".n @U",
        ".x A",".f u",
        ".m A",".m i",".m e",
        ".j ia",".j ie",
        ".l a",".l i",".l u",".l e",".l @U",
        ".s` a",".s` i",".s\\ e",
        ".f a",".f i",".f e",
        ".p i",".p e",".p uo",
        ".t i",".t u"
    ]
];

var guarded_note = [".sil",".pau",".cl","-","+","br"];

function srand(seed) {
    _rand = seed ^ 0x7C38FA53;
}

function rand(max) {
    _rand ^= _rand << 13;
    _rand ^= _rand >> 17;
    _rand ^= _rand << 5;
    return (_rand & 0x7fffffff) % max;
}

function main() {
    var form = {
        "title"   : SV.T(SCRIPT_TITLE),
        "message" : "",
        "buttons" : "OkCancel",
        "widgets" : [
            {
                "name" : "lang",
                "type" : "ComboBox",
                "label" : SV.T("Language"),
                "choices" : [SV.T("Japanese"),
                             SV.T("English"),
                             SV.T("Mandarin")],
                "default" : 0
            },
            {
                "name"     : "seed",
                "type"     : "Slider",
                "label"    : SV.T("Lyrics No."),
                "format"   : "%1.0f",
                "minValue" : 1,
                "maxValue" : 100000,
                "interval" : 1,
                "default"  : 1
            },
            {
                "name"     : "en_seed",
                "type"     : "CheckBox",
                "text"     : SV.T("Use fixed lyrics"),
                "default"  : false
            }
        ]
    };

    var results = SV.showCustomDialog(form);
    if(results.status) {
        var options = results.answers;
        var selection = SV.getMainEditor().getSelection();
        var selectedNotes = selection.getSelectedNotes();
        var lang = options.lang;
        if(selectedNotes.length == 0)
            return;

        if (options.en_seed) {
            srand(options.seed);
        }
        else {
            srand(Math.floor(Math.random() * 0x7fffffff));
        }

        for(var i = 0; i < selectedNotes.length; i ++) {
            if (guarded_note.indexOf(selectedNotes[i].getLyrics()) == -1) {
                selectedNotes[i].setLyrics(chr[lang][rand(chr[lang].length)]);
            }
        }
    }
    SV.finish();
}
