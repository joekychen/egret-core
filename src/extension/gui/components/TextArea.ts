
module egret.gui {

	export class TextArea extends SkinnableTextBase{
		/**
		 * 构造函数
		 */		
		public constructor(){
            super();
            
		}
		
		/**
		 * 控件的默认宽度（使用字号：size为单位测量）。 若同时设置了maxChars属性，将会根据两者测量结果的最小值作为测量宽度。
		 */		
		public get widthInChars():number{
			return this._getWidthInChars();
		}
		
		public set widthInChars(value:number){
			this._setWidthInChars(value);
		}
		
		/**
		 * 控件的默认高度（以行为单位测量）。 
		 */
		public get heightInLines():number{
			return this._getHeightInLines();
		}
		
		/**
		 *  @private
		 */
		public set heightInLines(value:number){
			this._setHeightInLines(value);
		}
		
		/**
		 * 水平滚动条策略改变标志
		 */		
		private horizontalScrollPolicyChanged:boolean = false;
		
		private _horizontalScrollPolicy:string;

		/**
		 * 水平滚动条显示策略，参见ScrollPolicy类定义的常量。
		 */		
		public get horizontalScrollPolicy():string{
			return this._horizontalScrollPolicy;
		}

		public set horizontalScrollPolicy(value:string){
			if(this._horizontalScrollPolicy==value)
				return;
			this._horizontalScrollPolicy = value;
			this.horizontalScrollPolicyChanged = true;
			this.invalidateProperties();
		}

		/**
		 * 垂直滚动条策略改变标志 
		 */		
		private verticalScrollPolicyChanged:boolean = false;
		
		private _verticalScrollPolicy:string;
		/**
		 * 垂直滚动条显示策略，参见ScrollPolicy类定义的常量。
		 */
		public get verticalScrollPolicy():string{
			return this._verticalScrollPolicy;
		}

		public set verticalScrollPolicy(value:string){
			if(this._verticalScrollPolicy==value)
				return;
			this._verticalScrollPolicy = value;
			this.verticalScrollPolicyChanged = true;
			this.invalidateProperties();
		}

		
		/**
		 * [SkinPart]实体滚动条组件
		 */
		public scroller:Scroller;

        public _setText(value: string) {
            super._setText(value);
            this.dispatchEvent(new Event(Event.CHANGE));
        }

		/**
		 * @inheritDoc
		 */
		public commitProperties():void{
			super.commitProperties();
			
			if (this.horizontalScrollPolicyChanged){
				if (this.scroller)
					this.scroller.horizontalScrollPolicy = this.horizontalScrollPolicy;
				this.horizontalScrollPolicyChanged = false;
			}
			
			if (this.verticalScrollPolicyChanged){
				if (this.scroller)
					this.scroller.verticalScrollPolicy = this.verticalScrollPolicy;
				this.verticalScrollPolicyChanged = false;
			}
		}

		/**
		 * @inheritDoc
		 */
		public partAdded(partName:string, instance:any):void{
			super.partAdded(partName, instance);
			
			if (instance == this.textDisplay){
				this.textDisplay.multiline = true;
			}
			else if (instance == this.scroller){
				//if (this.scroller.horizontalScrollBar)
				//	this.scroller.horizontalScrollBar.snapInterval = 0;
				//if (this.scroller.verticalScrollBar)
				//	this.scroller.verticalScrollBar.snapInterval = 0;
			}
		}

		/**
		 * @inheritDoc
		 */
		public createSkinParts():void{
			this.textDisplay = new EditableText();
			this.textDisplay.widthInChars = 15;
			this.textDisplay.heightInLines = 10;
			this._addToDisplayList(<DisplayObject><any> (this.textDisplay));
			this.partAdded("textDisplay",this.textDisplay);
		}
		
	}
}