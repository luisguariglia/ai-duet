/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Buffer from 'Tone/core/Buffer'
import Tone from 'Tone/core/Tone'
import events from 'events'
const EventEmitter = events.EventEmitter
import StartAudioContext from 'startaudiocontext'

export default class Loader extends EventEmitter{
	constructor(container){
		super()

		this._divSala = document.createElement('div');
		this._divSala.id='divSala';	
		this._divSala.innerHTML=`
		<div class="divSala">	
			<h4 style="float:left;" class="divSala">Sala: </h4>		
			
			<select name="sala" id="sala" class="" style="margin-top:15px; padding: 5px;margin: 3px;background-color: orange;" >
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
			</select>	
			
		</div>`;
		this._divSala.classList.add('open');
		container.appendChild(this._divSala);
		this._divSala.addEventListener('change', (e) => {
			e.preventDefault()
			localStorage.setItem('sala', document.getElementById("sala").value);
		})

		const loader = document.createElement('div')
		loader.id = 'loader'
		container.appendChild(loader)

		const loaderText = document.createElement('div')
		loaderText.id = 'loaderText'
		loaderText.textContent = 'cargando'
		loader.appendChild(loaderText)

		const fill = document.createElement('div')
		fill.id = 'fill'
		loader.appendChild(fill)

		const fillText = document.createElement('div')
		fillText.id = 'fillText'
		fillText.textContent = 'cargando'
		fill.appendChild(fillText)

		StartAudioContext(Tone.context, loader)

		this.loaded = false

		Buffer.on('load', () => {

			this.loaded = true

			fillText.innerHTML = '<div id="piano"></div> <div id=""> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TOCAR</div>'
			loader.classList.add('clickable')

			loader.addEventListener('click', () => {

				this.emit('click')
			})
		})

		Buffer.on('progress', (prog) => {

			fill.style.width = `${(prog * 100).toFixed(2)}%`
			
		})
	}
}