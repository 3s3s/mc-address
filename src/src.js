'use strict';

//browserify --debug ./src/src.js > ./js/test.js

const $ = require('jquery');
const g_crypto = require('crypto');
const bitcoin = require('multicoinjs-lib');
const bigi = require('bigi');

const COIN = 'marycoin';

$('#form_getaddress').submit(function(e) {
    e.preventDefault();
    
    const nonce = $('#nonce').val().length == 0 ? "" : "&nonce="+$('#nonce').val();
    
    const hash = Hash(nonce);
    const pair = GetKeypair(hash);
    
    $('#address').html(pair.getAddress() || '');
    $('#key').html(pair.toWIF() || '');
});

function Hash(str)
{
    return g_crypto.createHash("sha256").update(str).digest('base64');
}

function GetKeypair(str)
{
    const hash = bitcoin.crypto.sha256(str);
    const d = bigi.fromBuffer(hash);

    const keyPair = new bitcoin.ECPair(d, null, {network: bitcoin.networks[COIN]});

    return keyPair;
};
