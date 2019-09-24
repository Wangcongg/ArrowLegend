import { ui } from "../../../../ui/layaMaxUI";
import GameBG from "../../../../game/GameBG";
import Game from "../../../../game/Game";
import GameEvent from "./../../../GameEvent";
import SysChapter from "../../../sys/SysChapter";
import App from "../../../../core/App";
import Session from "../../../Session";
import SysMap from "../../../sys/SysMap";
import GameCameraNum from "../../../../game/GameCameraNum";
import WorldCell from "./WorldCell";
import TimeGoldDialog from "../timegold/TimeGoldDialog";
import GameMain from "../../../GameMain";
import MyTimeGold from "../timegold/MyTimeGold";
import FlyEffect from "../../../../game/effect/FlyEffect";
import FlyUpTips from "../../../FlyUpTips";
    export default class WorldView extends ui.test.worldUI {
    // private _gameScene:Laya.Scene3D;

    private list:Laya.List;
    constructor() { 
        super();
        // this.height = GameBG.height;
        // this.btn_start.clickHandler = new Laya.Handler(this,this.onStart); 
        // this.jinbishu.value = "" + MainUI.xiaohao;

        // //创建场景
		// this._gameScene = new Laya.Scene3D();
		// this.box.addChild(this._gameScene);
		
		// //创建相机
		// let camera = new Laya.Camera(0, 0.1, 100);
		// this._gameScene.addChild(camera);
		// camera.transform.translate(new Laya.Vector3(0, 0.5, 1));
        // camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        // camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
		
		// //添加光照
		// let directionLight = new Laya.DirectionLight();
		// this._gameScene.addChild(directionLight);
		// directionLight.color = new Laya.Vector3(1, 1, 1);
        // directionLight.transform.rotate(new Laya.Vector3( -3.14 / 3, 0, 0));
        
        // this.box.addChild(this.btn_start);
        // this.on(Laya.Event.DISPLAY,this,this.onDis);

        this.box.y = this.box.y + App.top;
        this.box1.y = this.box1.y + App.top;

        this.list = new Laya.List();
        this.list.pos(this.box.x,this.box.y);
        this.addChild(this.list);
        this.list.itemRender = WorldCell;
        this.list.size( Laya.stage.width , Laya.stage.height - 170 );
        // this.list.repeatX = 1;
        // this.list.repeatY = 2;
        this.list.vScrollBarSkin = "";
        // this.list.selectEnable = true;
        this.list.renderHandler = new Laya.Handler(this, this.updateItem);

        this.on(Laya.Event.DISPLAY,this,this.onDis);

        let myTime = new MyTimeGold();
        myTime.setUI( this.timeLogo );
        this.timeLogo.on( Laya.Event.CLICK , this,this.timeClickFun );
        this.rankBtn.on( Laya.Event.CLICK,this,this.rankClickFun );
        this.sign7Btn.on( Laya.Event.CLICK,this,this.sign7clickFun );
        this.shareBtn.on( Laya.Event.CLICK,this,this.shareFun );
        //Laya.timer.once( 1000,this,this.tttFun );
        Laya.stage.on( GameEvent.ADD_COIN , this , this.addCoinFun );
        Laya.stage.on( GameEvent.APP_ENERGY ,  this, this.reducePowerFun );
        //Laya.stage.on( Laya.Event.CLICK ,this,this.reducePowerFun , [1] );
    }

    public reducePowerFun( v:number ):void{
        let r = new ui.test.ReducePowerUI();
        this.addChild( r ); 
        r.fc.value = "-" + v;
        let sp:Laya.Sprite = WorldCell.clickCell.mapBtn;
        let p = sp.localToGlobal( new Laya.Point( 0 ,0 ) , true, this );
        r.x = p.x + sp.width/2;
        r.y = p.y + sp.height/2;
        let t = new Laya.Tween();
        t.to( r , { y:r.y - 200 } , 700 , null , new Laya.Handler(this,this.rFun, [r] ));
    }

    private rFun(  a:Laya.Sprite ):void{
        a.removeSelf();
    }

    private shareFun():void{
        App.sdkManager.onlyShare();
    }

    private sign7clickFun():void{
        FlyUpTips.setTips("暂未开启");
    }

    private addCoinFun( v:number ):void {
        let last = Session.homeData.coins - v;
        let fc = Game.scenneM.main.mainUI.topUI.coinClip;
        fc.value = last + "";
        let cell = this.list.getCell(0);
        let fly = new FlyEffect();
        //fly.fly( this.list.getCell(0) , Game.scenneM.main.coinClip );
        fly.flyFromP( Laya.stage.width/2, Laya.stage.height/2 , Game.scenneM.main.mainUI.topUI.goldImg , v , last , fc );
    }

    private tttFun():void{
        
        //
        //this.filters = [Laya.ColorFilter];
    }

    private rankClickFun():void{
        App.dialogManager.open( GameMain.RANK_DIALOG );
    }

    private timeClickFun():void{
        App.dialogManager.open( GameMain.TIME_GOLD );
    }

    private updateItem(cell: WorldCell, index: number): void  {
        cell.update( this.list.getItem(index) );
    }

    // onComplete1() {
    //     let dude:Laya.Sprite3D = this._gameScene.addChild(Laya.Loader.getRes("h5/heroview/hero.lh")) as Laya.Sprite3D;
	// 	let scale = new Laya.Vector3(0.3, 0.3, 0.3);
    //     dude.transform.localScale = scale;
    //     dude.transform.localRotationEulerY = 0;
    //     let aniSprite3d = dude.getChildAt(0) as Laya.Sprite3D;
    //     if (aniSprite3d) {
    //         let ani_:Laya.Animator = aniSprite3d.getComponent(Laya.Animator) as Laya.Animator;
    //         ani_.speed = 0.5;
    //         ani_.play("Idle");
    //     }
	// }

    // private layer3d: Laya.Sprite3D 
    private onDis():void{
        // let sys:SysChapter = App.tableManager.getDataByNameAndId(SysChapter.NAME,Session.homeData.chapterId);
        // this.baioti.text = Session.homeData.chapterId + "." + sys.name;
        // this.biaoti2.text = this.baioti.text;
        // this.zuigao.text = "最高层数:" + Session.homeData.mapIndex + "/" + SysMap.getTotal(Session.homeData.chapterId);

        // this.baioti.visible = false;
        // this.biaoti2.visible = false;
        // this.zuigao.visible = false;

        // this.onComplete1();

        let indexTo:number = Session.homeData.chapterId - 1;
        indexTo = Math.max( indexTo , 0 );

        let arr:SysChapter[] = App.tableManager.getTable(SysChapter.NAME);
        let arr1 = arr.concat();
        arr1.length = 3;
        arr1.push( null );
        this.list.array = arr1;
        this.list.scrollTo( indexTo );

        let cell:ui.test.worldCellUI = <any>this.list.getCell( indexTo );
        cell.mapBtn.scale( 0.0,0.0 );
        let t = new Laya.Tween();
        t.to( cell.mapBtn , {scaleX:1,scaleY:1} , 500 , Laya.Ease.backOut , null , 200 );
        //Laya.timer.once( 200, this,this.callFun );
        //this.addCoinFun( 1000 );
    }

    private callFun():void{
        //console.log( "aaa" , Session.homeData.chapterId );
        //this.list.scrollTo( Session.homeData.chapterId - 1 );
        
    }

    // private onStart():void
    // {
    //     Laya.stage.event(GameEvent.START_BATTLE);
    // }
}